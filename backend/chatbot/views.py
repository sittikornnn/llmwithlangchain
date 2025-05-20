from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .langchain_qa import get_answer  # สร้างไฟล์นี้ในขั้นตอนถัดไป

@csrf_exempt
def chat(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)
        question = data.get('question')
        if not question:
            return JsonResponse({'error': 'No question provided'}, status=400)
        
        result = get_answer(question)
        return JsonResponse(result)
    
    return JsonResponse({'message': 'Send a POST request with a question'})
