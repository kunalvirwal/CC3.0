API Structure

POST: /login
    recieves {voterID:"" , password:""}
    sends {ward:{ward details straight from db} , wards:[""] , token:"" }

POST: /ward/:wardName
    recieve Header: Authentication bearer
    send {issues:[straight from db by compairing ward]}

POST: /upvote/:issueID
    recieve Header: Authentication bearer
    send {error:"Already Upvoted"} OR {response:"Upvoted Successfully"}

POST: /downvote/:issueID
    recieve Header: Authentication bearer
    send {error:"Not Upvoted"} OR {response:"Removed Upvote"}

POST: /comment/:issueID
    recieve Header: Authentication bearer AND {content:""}
    send {response:"Commented Successfully"} OR {error:"Empty message content"}

POST: /compareIssues/:wardName
    recieve Header: Authentication bearer AND {prompt:""}
    send {response:""}