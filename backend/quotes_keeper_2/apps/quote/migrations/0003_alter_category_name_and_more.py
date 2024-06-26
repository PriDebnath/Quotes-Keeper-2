# Generated by Django 5.0.2 on 2024-04-14 16:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quote', '0002_category_quotecategory'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='name',
            field=models.CharField(max_length=50, unique=True),
        ),
        migrations.AlterUniqueTogether(
            name='quotecategory',
            unique_together={('quote', 'category')},
        ),
    ]
