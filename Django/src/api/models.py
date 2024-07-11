from django.db.models import Model, AutoField, CharField, ForeignKey, RESTRICT, DateField, DecimalField, CASCADE
from rest_framework.serializers import ModelSerializer

# -------------------------------------------------

# Models that match the Vacations Database:

# -------------------------------------------------


class RoleModel(Model):
    role_id = AutoField(primary_key=True)
    role_name = CharField(max_length=10)

    class Meta:
        db_table = "roles"


class CountryModel(Model):
    country_id = AutoField(primary_key=True)
    country_name = CharField(max_length=255)

    class Meta:
        db_table = "countries"


class UserModel(Model):
    user_id = AutoField(primary_key=True)
    first_name = CharField(max_length=30)
    last_name = CharField(max_length=50)
    email = CharField(max_length=50)
    password = CharField(max_length=300)
    role = ForeignKey(RoleModel, on_delete=RESTRICT)

    class Meta:
        db_table = 'users'


class VacationModel(Model):
    vacation_id = AutoField(primary_key=True)
    country = ForeignKey(CountryModel, on_delete=RESTRICT)
    description = CharField(max_length=1500)
    start_date = DateField()
    end_date = DateField()
    price = DecimalField(max_digits=7, decimal_places=2)
    image_name = CharField(max_length=100)

    class Meta:
        db_table = 'vacations'


class LikesModel(Model):
    user = ForeignKey(UserModel, on_delete=CASCADE, primary_key=True)
    vacation = ForeignKey(VacationModel, on_delete=CASCADE)

    class Meta:
        db_table = "likes"
        unique_together = (('user', 'vacation'), )


class UserSerializer(ModelSerializer):
    
    class Meta:
        model = UserModel
        exclude = ['password']
