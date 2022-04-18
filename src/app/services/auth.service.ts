import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  userToken:string='';
 // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

 //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  usuario:UsuarioModel = new UsuarioModel();
  constructor(private http:HttpClient) {}

  logout(){}

  login(usuario:UsuarioModel){
    const authData = {
      ...usuario,
      returnSecureToken:true
    };
    return this.http.post(`${this.url}signInWithPassword?key=${this.apikey}`,authData).pipe(
      map(resp=>{
        console.log("Entro en el mapa");
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );
  }

  nuevoUsuario(usuario:UsuarioModel){
    const authData = {
      ...usuario,
      returnSecureToken:true
    };
    return this.http.post(`${this.url}signUp?key=${this.apikey}`,authData)
    .pipe(
      map(resp=>{
        console.log("Entro en el mapa");
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );
  }

  private guardarToken(idToken:string){
    this.userToken = idToken;
    localStorage.setItem('token',idToken);
  }

  leerToken(){
    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = '';
    }
    return this.userToken;
  }

  estaAutenticado():boolean{
    return this.userToken.length>2;
  }
}
