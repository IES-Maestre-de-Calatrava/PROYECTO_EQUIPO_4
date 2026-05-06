package com.grupo4.frances.Utilidades;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.util.ArrayList;

public class LectorActividadesJSON<E> {

	private String filename;
	
	public LectorActividadesJSON(String f) {
		this.filename=f;
	}
	
	public void guardar(ArrayList<E> lista) {

        if(!filename.exists()) {
            System.out.println("El archivo no existe, se creará uno nuevo.");
        }
		
		try(ObjectOutputStream fich = new ObjectOutputStream
				(new FileOutputStream(this.filename))){
			
			for (E obj : lista) {
				fich.writeObject(obj);
			}
			
		}catch(IOException e) {
			System.out.println(e);
		}
		
	}
	
}