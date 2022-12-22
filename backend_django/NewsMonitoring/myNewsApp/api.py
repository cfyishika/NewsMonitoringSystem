import json

from .serializers import *
from django.http import JsonResponse
from myNewsApp.models import *
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from myNewsApp.utils import story_view, story_fetching, check_rss


@csrf_exempt
def StoryList(request):
    if request.method == 'GET':
        is_staff = request.user.is_staff
        subscriber = Subscriber.objects.select_related('client',
                                                       'company_data').get(
            user=request.user.id)
        subscribed_client = subscriber.client
        if is_staff:
            stories = Story.objects.select_related('tagged_client',
                                                   'source').prefetch_related(
                'tagged_company')

        else:
            stories = Story.objects.filter(
                tagged_client=subscribed_client).select_related(
                'source',
                'tagged_client').prefetch_related(
                'tagged_company')

        serialized_stories = Story_listing_Serializer(stories,
                                                      many=True)
        for i in serialized_stories.data:
            for key, value in i.items():
                if key == 'tagged_company':
                    if(len(value)>0):
                        com_name = Company.objects.filter(
                                id__in=value
                            ).values_list('company_name', flat=True)
                        value.insert(0, list(com_name))

                    else:
                        value.insert(0, list(["unkown"]))

                    # if (value != [0] or (value == [0] and Company.objects.filter(
                    #         id=0).exists())):
                    #     com_name = Company.objects.filter(
                    #         id__in=value
                    #     ).values_list('company_name', flat=True)
                    #     value.insert(0, list(com_name))
                    #
                    # else:
                    #     value.insert(0, list(["unkown"]))

        # print(serialized_stories.data[7]['tagged_company'][0])
        # serialized_stories.data[7]['tagged_company'].append({'company_name':'facebook'})
        return JsonResponse(serialized_stories.data, safe=False,
                            status=200)

    if request.method == 'POST':
        data = JSONParser().parse(request)
        tagged_client = Subscriber.objects.select_related(
            'client'
        ).filter(user=request.user.id)[0].client
        tagged_client_id = tagged_client.id
        source_id = data['source_name']
        data['source_id'] = source_id['id']
        data['tagged_client_id'] = tagged_client_id
        company = []
        # import ipdb
        # ipdb.set_trace()
        print("data[tagged_company]", data['tagged_company'])
        if len(data['tagged_company']) > 0:
            for i in data['tagged_company']:
                print("company is-", company)
                company.append(i['id'])
                print("i[id]", i['id'])
            data['tagged_company'] = company
        else:
            data['tagged_company'] = []

        # # for i in range(len(company)):
        # #     data['tagged_company'].append(company[i])

        # import ipdb
        # ipdb.set_trace()
        # data['tagged_company'] = data['company_name']
        serializer = Story_listing_Serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            # import ipdb
            # ipdb.set_trace()
            # new = json.loads(serializer.data)
            # new["sbc"] = "dtfy"
            return JsonResponse(serializer.data, safe=False, status=201)
        return JsonResponse(serializer.errors, safe=False, status=400)


@csrf_exempt
def StoryDetail(request, pk):
    try:
        is_staff = request.user.is_staff
        subscriber = Subscriber.objects.select_related('client',
                                                       'company_data').get(
            user=request.user.id)
        subscribed_client = subscriber.client
        if is_staff:
            story = Story.objects.select_related('tagged_client',
                                                 'source').prefetch_related(
                'tagged_company').get(id=pk)

        else:
            story = Story.objects.filter(
                tagged_client=subscribed_client).select_related(
                'source',
                'tagged_client').prefetch_related(
                'tagged_company').get(id=pk)

    except Story.DoesNotExist:
        message = f'Story with id {pk} does not found '
        return JsonResponse({"Success": "False",
                             "Message": message}, safe=False,
                            status=404)

    if request.method == 'GET':
        serialized_stories = Story_listing_Serializer(story)
        return JsonResponse(serialized_stories.data, safe=False,
                            status=200)

    if request.method == 'PUT':
        print("request iss------------", request)
        # import ipdb
        # ipdb.set_trace()
        data = JSONParser().parse(request)
        x=data['tagged_company']
        company=[]
        if type(x[0][0])==str:
            for i in range(1,len(x)):
                company.append(x[i])
            data['tagged_company']=company
        else:
            for i in range(len(x)):
                company.append(x[i])
            data['tagged_company'] = company




        serializer = Story_listing_Serializer(story,
                                              data=data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, safe=False, status=201)
        return JsonResponse(serializer.errors, safe=False, status=400)

    if request.method == 'DELETE':
        story.delete()
        return JsonResponse({"Message": "Story Deleted Successfully"},
                            safe=False, status=204)


@csrf_exempt
def SourceList(request):
    if request.method == 'GET':
        if request.user.is_staff:
            source = Source.objects.all()
        else:
            source = Source.objects.select_related(
                'subscribed_user').filter(
                subscribed_user__user=request.user.id)
        serialized_sources = Source_Serializer(source,
                                               many=True)
        return JsonResponse(serialized_sources.data, safe=False,
                            status=200)

    if request.method == 'POST':
        data = JSONParser().parse(request)
        subscribed_user = Subscriber.objects.select_related('client').filter(
                user=request.user.id)[0]
        sourced_client = subscribed_user.client
        data['sourced_client'] = sourced_client.id
        data['subscribed_user'] = subscribed_user.id

        serializer = Source_Serializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, safe=False, status=201)
        return JsonResponse(serializer.errors, safe=False, status=400)


@csrf_exempt
def SourceDetail(request, pk):
    try:
        if request.user.is_staff:
            source = Source.objects.all().get(id=pk)
        else:
            source = Source.objects.select_related(
                'subscribed_user').filter(
                subscribed_user__user=request.user.id).get(id=pk)

    except Source.DoesNotExist:
        message = f'Source with id {pk} does not found '
        return JsonResponse({"Success": "False",
                             "Message": message}, safe=False,
                            status=404)
    if request.method == 'GET':
        serialized_sources = Source_Serializer(source)
        return JsonResponse(serialized_sources.data, safe=False,
                            status=200)
    elif request.method == 'PUT':
        print(request)
        data = JSONParser().parse(request)

        serializer = Source_Serializer(source, data=data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, safe=False, status=201)
        return JsonResponse(serializer.errors, safe=False, status=400)

    elif request.method == 'DELETE':
        source.delete()
        return JsonResponse({"Message": "Source Deleted Successfully"},
                            safe=False, status=204)


def CompanyList(request):
    if request.method == 'GET':
        company = Company.objects.all()
        serialized_companies = CompanySerializer(company, many=True)
        return JsonResponse(serialized_companies.data, safe=False,
                            status=200)


@csrf_exempt
def fetching(request, pk):
    source = Source.objects.select_related('sourced_client',
                                           'subscribed_user').get(id=pk)
    subscriber = Subscriber.objects.select_related('client',
                                                   'company_data').get(
        user=request.user.id)
    if request.user.is_staff:
        stories = Story.objects.select_related('tagged_client',
                                               'source').prefetch_related(
            'tagged_company')
    else:
        stories = Story.objects.filter(
            tagged_client=subscriber.client).select_related('source',
                                                            'tagged_client').prefetch_related(
            'tagged_company')

    story_fetching(source, subscriber, stories)
