echo "Setting up the server..."
cd server
# python3 -m venv .venv
# source .venv/bin/activate
python -m venv .venv
source venv/Scripts/Activate
pip install -r requirements.txt
echo "Server set up finished!"

cd ..

echo "Setting up the client..."
cd client
npm install
echo "Client set up finished!"