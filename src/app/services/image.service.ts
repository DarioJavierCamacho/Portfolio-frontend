import { Injectable, EventEmitter } from '@angular/core';
import { Storage, ref, listAll, getDownloadURL} from '@angular/fire/storage';
import { uploadBytes } from '@firebase/storage';




@Injectable({
  providedIn: 'root'
})
export class ImageService {

  public imgUrl: string;
  
  public subido$ = new EventEmitter<number>();
  public obtenido$ = new EventEmitter<number>(); 


  constructor(private storage: Storage) {
    this.imgUrl = "";
   }

  public uploadImage($event: any, nombre: string) {


    const file = $event.target.files[0];
    const imgref = ref(this.storage, "imagen/" + nombre);

    console.log(file);
    uploadBytes(imgref, file)
      .then(Response => {     
        console.log("direccion : " + this.imgUrl)
        this.subido$.emit(1);
      })
      .catch(
        (error) => {
          console.log("error al subir" + error)
        }
      )
    return this.imgUrl;

  }

  public getDownloadURLById(Id : string) : string{
    const imgRef = ref(this.storage, "imagen");
    this.subido$.subscribe( data =>{
      listAll(imgRef)
      .then(async response => {
        console.log(response)
        for (let item of response.items){
          const url = await getDownloadURL(item)
          if(item.name == Id){
          this.imgUrl=url;
          console.log("URL by ID " + url)
          this.obtenido$.emit(1)
          //window.location.reload();
          } 
        }
      })
      .catch(error => console.log(error));
    });
   
      return this.imgUrl;

  }


}