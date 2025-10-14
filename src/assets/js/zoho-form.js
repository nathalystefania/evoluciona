(function() {
  console.log('Zoho form local script loaded');

  // Obtener el form de Zoho por id o nombre
  var form = document.BiginWebToRecordForm 
          || document.BiginWebToRecordForm6778134000000950046 
          || document.BiginWebToContactForm6778134000000950046
          || document.WebToContacts6778134000000950046;

  if (!form) {
    console.warn('Zoho form not found yet');
    return;
  }

  form.action = 'https://bigin.zoho.com/crm/WebForm';
  form.className = form.className + ' wf-form-paid';

  window.validateForm123456 = function(event) {
    console.log('Zoho validateForm6778134000000950046 running');
    if ((typeof checkMandatory !== 'undefined' && checkMandatory()) ||
        (typeof checkMandatory123456 !== 'undefined' && checkMandatory6778134000000950046())) {
      form.submit();
    } else {
      event.preventDefault();
      return false;
    }
  };
})();


var mndFileds = new Array('First\x20Name', 'Last\x20Name', 'Email', 'Accounts.Account\x20Name');
var fldLangVal = new Array('Nombre', 'Apellidos', 'Correo electr&oacute;nico', 'Empresa u Organizaci&oacute;n');
var wfInnerWidth = window.innerWidth;
if (wfInnerWidth <= 768) {
    document.forms['BiginWebToRecordForm6778134000000950046'].setAttribute('data-ux-form-alignment', 'top');
}
function removeError(fieldObj) {
    var parentElement = fieldObj.closest('.wf-field'),
        childEle = parentElement.getElementsByClassName('wf-error-parent-ele')[0];
    if (childEle) {
        parentElement.classList.remove('wf-field-error-active');
        parentElement.removeChild(parentElement.getElementsByClassName('wf-error-parent-ele')[0]);
    }
}
function setError(fieldObj, label) {
    var parentElement = fieldObj.closest('.wf-field'),
        childEle = parentElement.getElementsByClassName('wf-error-parent-ele')[0];
    if (!childEle) {
        var errorParentEle = document.createElement('DIV'),
            spanEle = document.createElement('SPAN'),
            viewMoreEle = document.createElement('SPAN');
        spanEle.setAttribute('class', 'wf-field-error wf-field-error-long');
        spanEle.innerHTML = label;
        errorParentEle.classList.add('wf-error-parent-ele');
        errorParentEle.appendChild(spanEle);
        parentElement.append(errorParentEle);
        parentElement.classList.add('wf-field-error-active');
        if (spanEle.scrollWidth > parentElement.offsetWidth) {
            viewMoreEle.innerHTML = 'View More';
            viewMoreEle.classList.add('wf-error-view-more');
            errorParentEle.append(viewMoreEle);
            viewMoreEle.addEventListener('click', function () {
                errorParentEle.removeChild(viewMoreEle);
                spanEle.classList.remove('wf-field-error-long');
            });
        } else {
            spanEle.classList.remove('wf-field-error-long')
        }
    }
}
function validateFields6778134000000950046() {
    var isReturn = true;
    var form = document.forms['BiginWebToRecordForm6778134000000950046'];
    var validateFld = form.querySelectorAll('[fvalidate=true]');
    var i;
    for (i = 0; i < validateFld.length; i++) {
        var validateFldVal = validateFld[i].value;
        var fType = validateFld[i].getAttribute('ftype');
        if (validateFldVal !== '' || (validateFldVal === '' && fType.indexOf('date') !== -1)) {
            var wfLabel = validateFld[i].parentElement.parentElement.parentElement.getElementsByClassName('wf-label')[0];
            var fLabel = wfLabel ? wfLabel.innerHTML : '';
            switch (validateFld[i].getAttribute('ftype')) {
                case 'string_rest_number':
                case 'string':
                    var isError = false,
                        errorKey = 'Solo se permiten caracteres alfabéticos ';
                    if (validateFld[i].getAttribute('ftype') === 'string_rest_number' && validateFldVal.match((/\d/g)) !== null) {
                        isError = true;
                    } else if (validateFld[i].hasAttribute('fmin')) {
                        if (validateFldVal.length < parseInt(validateFld[i].getAttribute('fmin'))) {
                            errorKey = 'El valor debe tener al menos ' + validateFld[i].getAttribute('fmin') + ' carácter(es).';
                            isError = true;
                        } else if (validateFldVal.length > parseInt(validateFld[i].getAttribute('fmax'))) {
                            errorKey = 'El valor no puede exceder los ' + validateFld[i].getAttribute('fmax') + ' carácter(es).';
                            isError = true;
                        }
                    }
                    if (isError) {
                        setError(validateFld[i], errorKey);
                        isReturn = false;
                    }
                    break;
                case 'email':
                    if (validateFldVal.match(/^([A-Za-z0-9-._%'+/]+@[A-Za-z0-9.-]+.[a-zA-Z]{2,22})$/) === null) {
                        setError(validateFld[i], 'Ingrese un correo electrónico válido ' + fLabel);
                        isReturn = false;
                    }
                    break;
                case 'number':
                case 'double':
                    var isError = false,
                        errorKey = 'Enter valid ' + fLabel;
                    if ((validateFld[i].getAttribute('ftype') === 'number' && validateFldVal.match(/^[0-9]+$/) === null)
                        || (validateFld[i].getAttribute('ftype') === 'double' && validateFldVal.match(/^[0-9]*(\.[0-9]{0,2})?$/) === null)) {
                        isError = true;
                    } else if (validateFld[i].hasAttribute('fmin')) {
                        if (validateFldVal < parseInt(validateFld[i].getAttribute('fmin'))) {
                            errorKey = 'Ingrese un número mayor o igual a ' + validateFld[i].getAttribute('fmin');
                            isError = true;
                        } else if (validateFldVal > parseInt(validateFld[i].getAttribute('fmax'))) {
                            errorKey = 'Ingrese un número menor o igual a ' + validateFld[i].getAttribute('fmax');
                            isError = true;
                        }
                    }
                    if (isError) {
                        setError(validateFld[i], errorKey);
                        isReturn = false;
                    }
                    break;
                case 'mobile':
                    if (validateFldVal.match(/^[0-9a-zA-Z+.()\-;\s]+$/) === null) {
                        setError(validateFld[i], 'Ingrese un número de teléfono móvil válido ' + fLabel);
                        isReturn = false;
                    }
                    break;
            }
        }
    }
    return isReturn;
}

function checkMandatory6778134000000950046() {
    var isReturn = true;
    var isNotCaptcha = false;
    for (i = 0; i < mndFileds.length; i++) {
        var fieldObj = document.forms['BiginWebToRecordForm6778134000000950046'][mndFileds[i]];
        if (fieldObj) {
            if (((fieldObj.value).replace(/^\s+|\s+$/g, '')).length == 0) {
                if (fieldObj.type == 'file') {
                    setError(fieldObj, 'Seleccione un archivo para cargar.');
                    isReturn = false;
                }
                else {
                    setError(fieldObj, fldLangVal[i] + ' no puede estar vac&iacute;o.');
                    isReturn = false;
                }
            } else if (fieldObj.nodeName == 'SELECT') {
                if (fieldObj.options[fieldObj.selectedIndex].value == '-None-') {
                    setError(fieldObj, fldLangVal[i] + ' no puede ser nulo.');
                    isReturn = false;
                }
            } else if (fieldObj.type == 'checkbox') {
                if (fieldObj.checked == false) {
                    setError(fieldObj, 'Por favor acepte ' + fldLangVal[i]);
                    isReturn = false;
                }
            }
        }
    }
    isNotCaptcha = true;
    if (!validateFields6778134000000950046()) { isReturn = false; }
    if (!isReturn) {
        var errEle = document.getElementsByClassName('wf-field-error');
        if (errEle && errEle.length > 0) {
            var inputEle = errEle[0].closest('.wf-field').getElementsByTagName('input');
            if (inputEle && inputEle.length == 0) {
                inputEle = errEle[0].closest('.wf-field').getElementsByTagName('select');
            }
            if (inputEle && inputEle.length > 0) {
                inputEle[0].focus();
            }
        }
    } else if (isNotCaptcha) {
        document.getElementById('formsubmit').disabled = true;
    }
    return isReturn;
}


document.getElementById('hidden6778134000000950046Frame').addEventListener('load', function () {
    try {
        var doc = arguments[0].currentTarget.contentWindow.document;
        if (doc.body.childElementCount !== 0) {
            arguments[0].currentTarget.style.display = 'block';
            document.getElementById('BiginWebToRecordFormParent6778134000000950046').style.display = 'none';
            console.log('success zoho form');
        }
    } catch (error) {
        arguments[0].currentTarget.style.display = 'block';
        document.getElementById('BiginWebToRecordFormParent6778134000000950046').style.display = 'none'
        console.log('error zoho form');
    }
});