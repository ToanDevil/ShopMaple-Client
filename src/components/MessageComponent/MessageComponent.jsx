import { message } from "antd"

const success = (mess = 'Success') => {
    message.success(mess)
}

const warning = (mess = 'Warning') => {
    message.warning(mess)
}

const error = (mess = 'Error') => {
    message.error(mess)
}

export {success, error, warning}