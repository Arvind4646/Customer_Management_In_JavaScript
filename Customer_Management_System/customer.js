// Global Declarations
var arr_customer = [];
var txtId = document.getElementById('txtId');
var txtName = document.getElementById('txtName');
var txtAddress = document.getElementById('txtAddress');
var txtMobile = document.getElementById('txtMobile');
var fileProfile = document.getElementById('fileProfile');
var tableCustomer = document.getElementById('tableCustomer');
var trName = document.getElementById('trName');
var trAddress = document.getElementById('trAddress');
var trMobile = document.getElementById('trMobile');
var trProfile = document.getElementById('trProfile');
var trFindBtn = document.getElementById('trFindBtn');
var showBtn = document.getElementById('showBtn');
var trDeleteBtn = document.getElementById('trDeleteBtn');
var trUpdateBtn = document.getElementById('trUpdateBtn');
var trExsistBtn = document.getElementById('trExsistBtn');
var i = 0;
var customerIndex;

//Event Listeners
function btn_AddClick() {
    let IdValue = parseInt(txtId.value);
    let NameValue = txtName.value;
    let AddressValue = txtAddress.value;
    let MobileValue = txtMobile.value;
    try {
    let reader = new FileReader();
    reader.onload = function() {
        let profileValue = reader.result;
        addCustomer(IdValue, NameValue, AddressValue, MobileValue, profileValue);
    }
    reader.readAsDataURL(fileProfile.files[0]);
} catch (error) {
        alert("Please Choose profile picture to upload");
}
}

function btn_ShowButton() {
    trName.hidden = false;
    trAddress.hidden = false;
    trMobile.hidden = false;
    trProfile.hidden = false;
    trFindBtn.hidden = true;
    trDeleteBtn.hidden = true;
    trUpdateBtn.hidden = true;
    trExsistBtn.hidden = true;
    txtId.disabled = false;
    showBtn.hidden = false;
    for (let i = 0; i < arr_customer.length; i++) {
        let tr = document.getElementById('tr' + arr_customer[i].Id);
        tr.hidden = false;
    }
}

function btn_SearchClick() {
    hidden();
    trFindBtn.hidden = false;
}

function btn_DeleteClick() {
    hidden();
    trDeleteBtn.hidden = false;
}

function btn_UpdateClick() {
    hidden();
    trExsistBtn.hidden = false;
}

function btn_FindCustomer() {
    let txtIdValue = parseInt(txtId.value);
    showFilterCustomerInTable(txtIdValue);
}

function btn_DeleteCustomer() {
    let txtIdValue = parseInt(txtId.value);
    let index = findCustomerIndex(txtIdValue);
    if (index == -1) {
        alert('Customer not found');
    }
    else {
        arr_customer.splice(index, 1);
        console.log(arr_customer);
        let tr = document.getElementById('tr' + txtIdValue);
        tr.remove();
        i-=1;
        alert('customer deleted successfully');
        console.log(arr_customer);
    }
}

function btn_ExsistCustomer() {
    let txtIdValue = parseInt(txtId.value);
    let index = findCustomerIndex(txtIdValue);
    if (index == -1) {
        alert("customer does not exsist");
    }
    else {
        trName.hidden = false;
        trAddress.hidden = false;
        trMobile.hidden = false;
        trProfile.hidden = false;
        trExsistBtn.hidden = true;
        trUpdateBtn.hidden = false;
        alert("customer exsist");
        customerIndex = index;
        txtId.disabled = true;
        txtName.value = arr_customer[index].Name;
        txtAddress.value = arr_customer[index].Address;
        txtMobile.value = arr_customer[index].Mobile;
    }
}

function btn_UpdateCustomer() {
    let txtNameValue = txtName.value;
    let txtAddressValue = txtAddress.value;
    let txtMobileValue = txtMobile.value;

    let reader = new FileReader();
    reader.onload = function() {
        let fileProfileValue = reader.result;
        updateCustomer(txtNameValue, txtAddressValue, txtMobileValue, fileProfileValue);
    }
    reader.readAsDataURL(fileProfile.files[0]);
}

//Normal Functions
function addCustomer(IdValue, NameValue, AddressValue, MobileValue, ProfileValue) {
    let index = findCustomerIndex(IdValue);
    if(index == -1){
        let customer_object = { Id: IdValue, Name: NameValue, Address: AddressValue, Mobile: MobileValue, Profile: ProfileValue};
        arr_customer.push(customer_object);
        alert("Customer Added Successfully");
        console.log(arr_customer);
        showCustomerInTable();
    }
    else{
        alert('customer with id ' +IdValue+ ' exsist');
    }
       
}

function showCustomerInTable() {
    while (i < arr_customer.length) {
        var tableTr = document.createElement('tr');
        tableTr.setAttribute('id', 'tr' + arr_customer[i].Id);

        var tableTdId = document.createElement('td');
        var tableTdIdText = document.createTextNode(arr_customer[i].Id);
        tableTdId.appendChild(tableTdIdText);
        tableTr.appendChild(tableTdId);
        tableTdId.setAttribute('id', 'trId' + arr_customer[i].Id);

        var tableTdName = document.createElement('td');
        tableTdName.innerText = arr_customer[i].Name;
        tableTr.appendChild(tableTdName);
        tableTdName.setAttribute('id', 'trName' + arr_customer[i].Id);

        var tableTdAddress = document.createElement('td');
        tableTdAddress.innerText = arr_customer[i].Address;
        tableTr.appendChild(tableTdAddress);
        tableTdAddress.setAttribute('id', 'trAddress' + arr_customer[i].Id);

        var tableTdMobile = document.createElement('td');
        tableTdMobile.textContent = `${arr_customer[i].Mobile}`;
        tableTr.appendChild(tableTdMobile);
        tableTdMobile.setAttribute('id', 'trMobile' + arr_customer[i].Id);

        var tableTdImage = document.createElement('td');
        var img = document.createElement('img');
        img.setAttribute('id','img'+arr_customer[i].Id);
        img.setAttribute('src',arr_customer[i].Profile);
        img.setAttribute('width','100px');
        tableTdImage.appendChild(img);
        tableTdImage.setAttribute('id', 'trProfile' + arr_customer[i].Id);
        tableTr.appendChild(tableTdImage);

        tableCustomer.appendChild(tableTr);
        i++;
    }
}

function showFilterCustomerInTable(txtIdValue) {
    let b = false;
    for (let i = 0; i < arr_customer.length; i++) {
        if (arr_customer[i].Id == txtIdValue) {
            let tr = document.getElementById('tr' + arr_customer[i].Id);
            tr.hidden = false;
            b = true;
        }
        else if (b == false && i == arr_customer.length - 1) {
            let tr = document.getElementById('tr' + arr_customer[i].Id);
            tr.hidden = true;
            alert('customer not found');
        }
        else {
            let tr = document.getElementById('tr' + arr_customer[i].Id);
            tr.hidden = true;
        }
    }
}

function findCustomerIndex(txtIdValue) {
    let index = arr_customer.findIndex((e) => e.Id == txtIdValue);
    return index;
}

function updateCustomer(txtNameValue, txtAddressValue, txtMobileValue,fileProfileValue) {
    let obj = arr_customer[customerIndex];
    obj.Name = txtNameValue;
    obj.Address = txtAddressValue;
    obj.Mobile = txtMobileValue;
    obj.Profile = fileProfileValue;
    let tdName = document.getElementById('trName' + arr_customer[customerIndex].Id);
    tdName.innerText = arr_customer[customerIndex].Name;
    let tdAddress = document.getElementById('trAddress' + arr_customer[customerIndex].Id);
    tdAddress.innerText = arr_customer[customerIndex].Address;
    let tdMobile = document.getElementById('trMobile' + arr_customer[customerIndex].Id);
    tdMobile.innerText = arr_customer[customerIndex].Mobile;
    let tdProfile = document.getElementById('img' + arr_customer[customerIndex].Id);
    tdProfile.setAttribute('src',fileProfileValue);
    alert('Customer updated successfully');
}

function hidden() {
    trName.hidden = true;
    trAddress.hidden = true;
    trMobile.hidden = true;
    trProfile.hidden = true;
    showBtn.hidden = true;
}