from langchain.docstore.document import Document
from langchain_community.llms import Ollama
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.chains import RetrievalQA
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    return psycopg2.connect(
        dbname='Econ',
        user='postgres',
        password='123456789',
        host='localhost',
        cursor_factory=RealDictCursor
    )

def get_data():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT name, price FROM public.produce ORDER BY id ASC')
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return data

def get_answer(question):
    # Pre-load data
    data = get_data()
    docs = []
    for idx, row in enumerate(data):
        renamed_row = {
            "ชื่อโทรศัพท์มือถือ": row["name"],
            "ราคา": row["price"]
        }
        page_content = "\n".join([f"{k}: {v}" for k, v in renamed_row.items()])
        docs.append(Document(page_content=page_content, metadata={"row": idx}))

    split_docs = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50).split_documents(docs)
    vectorstore = FAISS.from_documents(split_docs, HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2"))
    llm = Ollama(model="llama3.2:3b")
    qa_chain = RetrievalQA.from_chain_type(llm=llm, retriever=vectorstore.as_retriever(), return_source_documents=True)
    result = qa_chain(question)
    return {
        "result": result["result"],
        "source_rows": [doc.metadata.get("row", "unknown") for doc in result["source_documents"]]
    }