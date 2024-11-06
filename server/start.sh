echo "Starting the FASTAPI server"

OS_NAME=$(uname)

if [ "$OS_NAME" = "CYGWIN" ] || [ "$OS_NAME" = "MINGW" ] || [ "$OS_NAME" = "MSYS" ] || [ "$OS_NAME" = "Windows" ]; then
    echo "Windows .venv activation"
    source .venv/Scripts/Activate
else
    echo "Linux .venv activation"
    source .venv/bin/activate
fi

uvicorn server:app --reload
