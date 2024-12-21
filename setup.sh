echo "Setting up the root project directory..."
npm install
echo "Root project directory set up finished!"
echo "Setting up the server..."
cd server

# Get the OS name
OS_NAME=$(uname)

# Check the OS and activate the virtual environment accordingly
if [ "$OS_NAME" = "Linux" ] || [ "$OS_NAME" = "Darwin" ]; then
    # For Linux and macOS
    python3 -m venv .venv
    source .venv/bin/activate
elif [ "$OS_NAME" = "CYGWIN" ] || [ "$OS_NAME" = "MINGW" ] || [ "$OS_NAME" = "MSYS" ]; then
    # For Windows (Cygwin, MinGW, Git Bash)
    python -m venv .venv
    source .venv/Scripts/Activate
else
    echo "Unsupported OS: $OS_NAME"
    exit 1
fi

pip install -r requirements.txt
echo "Server set up finished!"

cd ../client

echo "Setting up the client..."
npm install
echo "Client set up finished!"

# cd ../playwright
# npm install
