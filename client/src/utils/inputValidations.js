export const name_validation = {
     validation: { 
        required: {
            value: true,
            message: `required`,
        },
         maxLength: {
            value: 30,
            message: 'maximum 30 characters',
        },
    }
    
  }


export const optional_settings_validation = {
    validation: { 
        maxLength: {
            value: 200,
            message: 'maximum 200 characters',
        },
    }

}

export const forgot_psd_validation = {
    validation: {
      required: {
          value: true,
          message: 'required',
      },
      pattern: {
          value:  /^((([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))|(^[A-Za-z][A-Za-z0-9_]+)$/,
          message: 'insert valid email or username',
      },
  }
  
}

export const email_validation = {
    validation: {
      required: {
          value: true,
          message: 'required',
      },
      pattern: {
          value:  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: 'insert valid email',
      },
  }
  
}

export const text_validation = {
    validation: {
      required: {
          value: true,
          message: 'required',
      },
    maxLength: {
        value: 500,
        message: 'maximum 500 characters',
    },
  }
  
}

export const password_validation = {
      validation: {
        required: {
            value: true,
            message: 'required',
        },
        minLength: {
            value: 6,
            message: 'minimum 6 characters',
        },
        maxLength: {
            value: 30,
            message: 'maximum 30 characters',
        },
        pattern: {
            value:  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@><{};'|":./$%^&*-]).{6,}$/,
            message: 'include Uppercase, Lowercase, digit and special character',
        },
        
    }
    
  }

  

export const code_validation = {
    validation: {
      required: {
          value: true,
          message: 'required',
      },
        
  }
  
}

export const phone_validation = {
      validation: {
        required: {
            value: true,
            message: 'required',
        },
        pattern: {
            value:  /^(([+][0-9]+.{10})|([0-9]{10}))$/,
            message: 'invalid phone number format',
        },
        minLength: {
            value: 10,
            message: 'minimum 10 digits',
        },
        maxLength: {
            value: 12,
            message: 'maximum 12 digits',
        },
       
    }
    
  }