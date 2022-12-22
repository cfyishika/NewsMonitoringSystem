from myNewsApp.models import *
from rest_framework import serializers, permissions
from rest_framework_simplejwt.serializers import \
    TokenObtainPairSerializer
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'


class CompanySerializerName(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = 'company_name'


class Source_Serializer(serializers.ModelSerializer):
    # sourced_client = serializers.CharField(read_only=True)
    # sourced_client_id = serializers.PrimaryKeyRelatedField(
    #     source='sourced_client', queryset=Company.objects.all())

    # subscribed_user_id = serializers.PrimaryKeyRelatedField(
    #     source='subscribed_client', queryset=Subscriber.objects.all())

    class Meta:
        model = Source
        # fields = ('id', 'name', 'url', 'sourced_client_id')
        fields='__all__'


class Story_listing_Serializer(serializers.ModelSerializer):
    source_id = serializers.PrimaryKeyRelatedField(source='source',
                                                   queryset=Source.objects.all())
    source = serializers.CharField(read_only=True)
    tagged_client_id = serializers.PrimaryKeyRelatedField(
        source='tagged_client', queryset=Company.objects.all())
    # tagged_company_name = CompanySerializerName(read_only=
    #                                         True, many=True)
    # tagged_company_name=tagged_company['company_name']
    permission_classes = [permissions.IsAuthenticated]

    class Meta:
        model = Story
        fields = (
            'id', 'title', 'source_id', 'source', 'pub_date',
            'body_text',
            'url', 'tagged_client_id', 'tagged_company')
