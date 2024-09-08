# need start the FASTAPI server
# export PYTHONPATH=$HOME/Users/sahil/Dev/Projects/doctor_octopus/server
# echo $PYTHONPATH
source venv/bin/activate
uvicorn server:app --reload