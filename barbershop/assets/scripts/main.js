const username = document.getElementById('username');
const phoneNumber = document.getElementById('phone-number');
const selectGender = document.getElementById('select-gender');
const haircutType = document.getElementById('haircut-type');

let save = document.getElementById('submit-btn');

function clearValue(fields) {
    username.value = '';
    phoneNumber.value = '';
    selectGender.value = '';
    haircutType.value = '';
}

save.addEventListener('click', () => {
    saveData();
    alert('Your appointment has been made. Wait for our assistant call');
    clearValue();
});

let saveData = function(doc) {
    myDB.doc(`userInfo/user_${username.value.toLowerCase()}`).set({
        name: username.value,
        phone: phoneNumber.value,
        gender: selectGender.value,
        type: haircutType.value,
    })
        .then(function() {
            console.log('result saved');
        })
        .catch(function() {
            console.log('error cannot save result: ', error);
        });
};

let getResult = function() {
    let resultData = [];
    myDB.collection('userInfo').get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                resultData.push(doc.data());
                console.log(`${doc.id} => ${doc.data().name}, ${doc.data().phone}, ${doc.data().gender}, ${doc.data().type}`);
            });
        });
};

console.log(getResult());