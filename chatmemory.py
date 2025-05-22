from langchain_community.llms import Ollama
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory

# Load the local LLM
llm = Ollama(model="llama3.2:1b")  # You can use any model you installed in Ollama

# Add memory to remember past messages
memory = ConversationBufferMemory()

# Create a conversation chain
conversation = ConversationChain(
    llm=llm,
    memory=memory,
    verbose=True  # Shows prompt formatting and memory contents
)

# Simple terminal chat loop
print("🤖 Chatbot is ready! Type 'exit' to stop.\n")
while True:
    user_input = input("You: ")
    if user_input.lower() in ["exit", "quit"]:
        print("👋 Goodbye!")
        break

    response = conversation.predict(input=user_input)
    print("Bot:", response)