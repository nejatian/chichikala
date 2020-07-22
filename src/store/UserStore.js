import {extendObservable} from 'mobx';
/**
 * user store
 */
class UserStore{
    constructor(){ 
        extendObservable(this,{
            loading: true,
            isLoggedIn:false,
            username:'',
            token:''
        })
    }
}
export default new UserStore() ;