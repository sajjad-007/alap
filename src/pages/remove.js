// onValue(ref(db, "block"), (list) => {
// const arr = [];
// if (list.val() !== null) {
// Object.entries(list.val()).map(([key, val]) => {
// if (
// authUserInfo.id === val.receiverid ||
// authUserInfo.id === val.senderid
// ) {
// arr.push({ ...val, id: key });
// }
// });
// }
// setBlockUser(arr);
// });

///////////////

// senderid:
// authUserInfo.id === data.receiverid ? data.receiverid : data.senderid,
// receiverid:
// authUserInfo.id !== data.senderid ? data.senderid : data.receiverid,