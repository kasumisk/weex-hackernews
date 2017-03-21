const modal = weex.requireModule('modal');

export function login_message(res){
    if (res.subErrors) {
        var errCode = res.subErrors[0].code,
            errMsg = '';
        switch (errCode) {
            case 'isv.user-login-service-error:ERROR_IMGCODE':
                errMsg = '图形验证码不正确';
                break;
            case 'isv.user-login-service-error:PASSWORD_ERROR':
                errMsg = '密码错误，错误5次将锁定账号';
                break;
            case 'isv.user-login-service-error:USERNAME_NOT_NULL':
                errMsg = '用户名不能为空';
                break;
            case 'isv.user-login-service-error:PASSWORD_NOT_NULL':
                errMsg = '密码不能为空';
                break;
            case 'isv.user-login-service-error:USER_NOT_EXIST':
                errMsg = '用户不存在';
                break;
            case 'isv.user-login-service-error:USER_PASSWORD_ERROR_FIVE':
                errMsg = '本用户已锁定，请联系客服处理';
                break;
            case 'isv.user-login-service-error:USER_LOCKED':
                errMsg = '本用户已锁定，请联系客服处理';
                break;
            default:
                errMsg = res.subErrors[0].message;
                break;
        }
        modal.toast({
            message: errMsg,
            duration: 0.5
        })
    } else {
        modal.toast({
            message: res.message,
            duration: 0.5
        })
    }

}