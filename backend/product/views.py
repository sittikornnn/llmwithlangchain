from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .db import get_connection
from psycopg2.extras import RealDictCursor

@csrf_exempt
def get_product(request):
    if request.method == 'GET':
        conn = get_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)  # ✅ เพิ่มตรงนี้
        cursor.execute("SELECT id, name, price FROM produce")
        rows = cursor.fetchall()
        cursor.close()
        conn.close()

        products = [
            {"id": row['id'], "name": row['name'], "price": row['price']}
            for row in rows
        ]

        return JsonResponse(products, safe=False, status=200)

    return JsonResponse({"error": "Method not allowed"}, status=405)

@csrf_exempt
def add_product(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        name = data.get("name")
        price = data.get("price")

        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO produce (name, price) VALUES (%s, %s)",
                       (name, price))
        conn.commit()
        cursor.close()
        conn.close()

        return JsonResponse({"status": "Product added"}, status=201)


@csrf_exempt
def update_product(request, product_id):
    if request.method == 'PUT':
        data = json.loads(request.body)
        name = data.get("name")
        price = data.get("price")

        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("UPDATE produce SET name=%s, price=%s WHERE id=%s",
                       (name, price, product_id))
        conn.commit()
        cursor.close()
        conn.close()

        return JsonResponse({"status": "Product updated"})


@csrf_exempt
def delete_product(request, product_id):
    if request.method == 'DELETE':
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM produce WHERE id=%s", (product_id,))
        conn.commit()
        cursor.close()
        conn.close()

        return JsonResponse({"status": "Product deleted"})