to run locally
- `pip install -r requirements.txt`
- create a copy of the `.env.example` file named `.env`
- `fastapi dev main.py`

ip insetos: uvicorn main:app --host 192.168.0.113 --port 3001
ip plantas: uvicorn main:app --host 192.168.0.113 --port 8001

uvicorn main:app --host 10.83.132.152 --port 8001

caso nao reconheça a ASGI: cd backend
ipconfig
uvicorn main:app --host 192.168.0.113 --port 8000

CONFERIR SE TA NO TERMINAL CERTO......
caso nao reconheça npm: checar nodejs caraio de programa
npm init
npm run preview -- --host 192.168.0.113 --port 8001
npm run build
npm run dev 


ip unioeste
uvicorn main:app --host 10.83.132.152 --port 8000
npm run preview -- --host 10.83.132.152 --port 8000

logo
logo: npm run generate-pwa-assets