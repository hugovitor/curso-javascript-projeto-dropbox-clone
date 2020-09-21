class DropBoxController {

    constructor(){

        this.btnSendFilesEl = document.querySelector('#btn-send-file');
        this.inputFilesEl = document.querySelector('#files');
        this.snackModalEl = document.querySelector('#react-snackbar-root');

        this.initEvents();

    }//FECHA METODO CONSTRUTOR

    initEvents(){

        this.btnSendFilesEl.addEventListener('click', event =>{

            this.inputFilesEl.click();

        });

        this.inputFilesEl.addEventListener('change', event =>{

            this.uploadTask(event.target.files);
            this.snackModalEl.style.display = 'block';

        });
    }//FECHA  initEvents

    uploadTask(file){

        let promises = [];

        [...file].forEach(file =>{
            promises.push(new Promise((resolve, reject) =>{

                let ajax = new XMLHttpRequest();
                ajax.open('POST', '/upload');
                ajax.onload = event =>{
                    try{
                        resolve(JSON.parse(ajax.responseText));
                    } catch(e){
                        reject(e);
                    }
                };

                ajax.onerror = event =>{
                    reject(event);
                };

                let formData = new FormData();
                formData.append('input-file', file);
                ajax.send(formData);

            }));
        });

        return Promise.all(promises);

    }//FECHA  uploadTask
}