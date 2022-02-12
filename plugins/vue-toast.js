import Vue from 'vue'

export default async(ctx, inject) => {

    inject('successToast', (text) => {
        console.log('text :>> ', Vue.prototype);
        Vue.prototype.$toasted.success(text,{ 
            theme: "toasted-primary", 
            position: "top-right", 
            duration : 5000
        });
    })
}