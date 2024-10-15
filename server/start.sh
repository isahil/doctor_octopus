# need start the FASTAPI server
# export PYTHONPATH=$HOME/Users/sahil/Dev/Projects/doctor_octopus/server
# echo $PYTHONPATH
source venv/bin/activate
# source venv/Scripts/Activate
uvicorn server:app --reload