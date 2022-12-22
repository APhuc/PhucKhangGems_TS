const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const PHONE_REGEX = /^(0[3|5|7|8|9])+([0-9]{8})$/

const regEx = { EMAIL_REGEX, PHONE_REGEX }

export default regEx