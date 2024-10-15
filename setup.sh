echo "setting up the server"
cd server
python -m venv venv
# source venv/bin/activate
source venv/Scripts/Activate
pip install -r requirements.txt
echo "server set up finished"

cd ..

echo "setting up the client"
cd client
npm install
echo "client set up finished"