const isDuplicateRecord=(errMsg)=>{
    console.log(errMsg)
    return errMsg.includes("duplicate")
}

module.exports={isDuplicateRecord}