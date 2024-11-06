echo "Starting the FASTAPI server"

OS_NAME=$(uname)
echo "OS: $OS_NAME"

if [ "$OS_NAME" = "Linux" ] || [ "$OS_NAME" = "Darwin" ]; then
    echo "Linux .venv activation"
    source .venv/bin/activate
else
    echo "Windows .venv activation"
    source .venv/Scripts/Activate
fi

uvicorn server:app --reload
