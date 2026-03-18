from django.db import models

class Course(models.Model):
    department = models.CharField(max_length=50)      # 開課單位
    coursetitle = models.CharField(max_length=200)    # 課程名稱
    instructor = models.CharField(max_length=50)      # 授課教師

    def __str__(self):
        return self.coursetitle