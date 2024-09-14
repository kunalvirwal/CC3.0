GET:/login
    recieves {voterID:"" , password:""}
    sends {ward:"" , wards:[] , token:"" }

GET:/ward/:wardName
    recieve Header: Authentication bearer
    send {issues:[straight from db by compairing ward]}