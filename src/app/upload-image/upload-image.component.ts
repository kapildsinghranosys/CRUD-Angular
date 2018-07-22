import { Component, OnInit, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
//import { AppConfig } from '../app.config';
import { environment } from "../../environments/environment";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-upload-image",
  templateUrl: "./upload-image.component.html",
  styleUrls: ["./upload-image.component.scss"]
})
export class UploadImageComponent implements OnInit {
  //@Input('id') parentRecordId: number;
  @Input() id: string;
  @Input() img: string;
  private _url: string = environment.apiUrl;
  imageUrl: string = "../assets/img/default-image.png";
  fileToUpload: File = null;
  test:any;
  constructor(private http:HttpClient, private _authService: AuthService) {}

  ngOnInit() {
    if(this.img){
      this.imageUrl = this._url+'employee/'+this.img;
    }
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  OnSubmit(Image) {
    
    const endpoint = this._authService.apiUrl()+'employee/uploadUserImage.php';
    const formData: FormData = new FormData();
    formData.append('img', this.fileToUpload, this.fileToUpload.name);
    formData.append('id', this.id);
    this.http.post(endpoint, formData,{responseType:'json'}).subscribe(data=>{
      this.processResult(data);
    });
    
  }
  
  processResult(data) {
    //console.log(data.success);
    if(data.success == 1){
      console.log('Image uploaded successfully'); 
    }   
  }
}
