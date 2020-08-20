
function getIndex(list, id){
    for(var i =0 ; i<list.length; i++){
        if(list[i].id === id){
            return i;
        }
    }
    return -1;
}

var receiptApi = Vue.resource('/receipt{/id}');

Vue.component('receipt-form',{
    props: ['receipts', 'receiptAttr'],
    data: function(){
        return{
            text: '',
            id: ''
        }
    },
    watch: {
      receiptAttr: function(newValue, oldValue){
          this.text = newValue.text;
          this.id = newValue.id;
      }
    },
   template:
    '<div>' +
       '<input type="text" placeholder="Write something" v-model="text" />' +
       '<input type="button" value="Save" @click="save" />' +
    '</div>',
    methods: {
        save: function (){
            var receipt = {text: this.text};

            if(this.id ){
                receiptApi.update({id: this.id}, receipt).then(result =>
                    result.json().then(data => {
                        var index = getIndex(this.receipts, data.id);
                        this.receipts.splice(index, 1, data);
                        this.text = '';
                        this.id = '';
                    })
                )
            }else {
                receiptApi.save({}, receipt).then(result =>
                    result.json().then(data => {
                        this.receipts.push(data);
                        this.text = ''
                    })
                )
            }
        }
    }
});

Vue.component('receipt-row',{
    props: ['receipt', 'editReceipt', 'receipts'],
    template: '<div><i>({{ receipt.id }})</i> {{ receipt.text }}' +
        '<span style="position: absolute; right: 0">' +
            '<input type="button" value="Edit" @click="edit" />' +
            '<input type="button" value="X" @click="del" />' +
        '</span>' +
        '</div>',
    methods: {
        edit: function(){
            this.editReceipt(this.receipt);
        },
        del: function(){
            receiptApi.remove({id: this.receipt.id}).then(result => {
                if (result.ok){
                    this.receipts.splice(this.receipts.indexOf(this.receipt),1 )
                }
            })
        }
    }

});

Vue.component('receipts-list', {
    props: ['receipts'],
    data: function(){
        return {
        receipt: null
        }
    },
    template: '<div style="position: relative; width: 300px;">' +
        '<receipt-form :receipts="receipts" :receiptAttr="receipt" />' +
            '<receipt-row v-for="receipt in receipts" :key="receipt.id" :receipt="receipt" ' +
        ':editReceipt="editReceipt" :receipts="receipts"/>' +
        '</div>',

    methods: {
        editReceipt : function(receipt){
            this.receipt = receipt;
        }
    }
});

var app = new Vue({
    el: '#app',
    template:
        // '<div>' +
        //     '<div v-if="!profile">Необходимо авторизоваться через <a href="/login">Google</a></div>' +
        //     '<div v-else>' +
        //         '<div>{{profile.name}}&nbsp;<a href="/logout">Выйти</a></div>' +
        //         '<receipts-list :receipts="receipts" />' +
        //     '</div>' +
        // '</div>',
    '<div>' +
        '<div v-if="!profile">Необходимо авторизоваться через <a href="/login">Google</a></div>' +
        '<div v-else>' +
            '<div>{{profile.name}}&nbsp;<a href="/logout">Выйти</a></div>' +
            '<receipts-list :receipts="receipts" /> ' +
        '</div>' +
    '</div>',
    data: {
        receipts: frontendData.receipts,
        profile: frontendData.profile
    },
    created: function(){
        // receiptApi.get().then(result =>
        //     result.json().then(data =>
        //         data.forEach(receipt => this.receipts.push(receipt))
        //     )
        // )
    }
});