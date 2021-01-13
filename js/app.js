
let app = new Vue({
    el: "#root",
    data: {
        // Initialisation des variable globales
        poids_maximum: 0,
        dernier_id: 1,
        nom: "",
        poids: 0,
        valeur: 0,
        obj: [],
        valeur_maximum: 0,
        liste_obj:[],
        lignes : 0,
        colonnes : 0,
        matri : [],

    },
    methods: {
        
        Ajouter_objet() {
            // Ajouter un objet à la liste d'objets
            nv_obj = {};
            nv_obj.id = this.dernier_id + 1;
            nv_obj.nom = this.nom;
            nv_obj.poids = this.poids;
            nv_obj.valeur = this.valeur;
            this.obj.push(nv_obj);
            this.nom = "";
            this.poids = 0;
            this.valeur = 0;
            this.dernier_id++;

        },

        Supp_objet(id) {
             // Suppression d'un objet grâce à de son id
            this.obj = this.obj.filter((value) => {
                return value.id != id;
            });
        },

        Afficher_tout() {
    // Afficher les résultats obtenus : Valeur maximale, Matrice, Liste d'objets.
            this.valeur_maximum = this.Recup_resultats();
           var done = this.Afficher_matrice_dyn();
          $("#resultat_final").html("");
          $("#resultat_final2").html("");          
          $("#resultat_final").html("La valeur maximale est : "+this.valeur_maximum);
          var message ="";
          if(this.liste_obj.length == 0){
             message = "Aucun objet à afficher.";
          }else{
             message = 'La liste des objets est : '+this.liste_obj.join(' , ');
          }
          $("#resultat_final2").html(message);
         $('#resultat_final').show();
         $('#resultat_final2').show();
        },

        Constr_mat() {
       
          // Création d'un objet vide
            obj = [{
                id: 0,
                nom: '',
                valeur: 0,
                poids: 0
            }];
        // Ajout d'un objet représentant la ligne 0
            this.obj.map(o => obj.push(o));

       // Initialisation du nombre de lignes
            lignes_mat = obj.length; this.lignes = lignes_mat;
       // Initialisation du nombre de colonnes
            col_mat = parseInt(this.poids_maximum) + 1; this.colonnes = col_mat;
      // Création de la matrice contenant : lignes_mat lignes et col_mat colonnes.
            let matrice = Array(lignes_mat).fill().map(() => Array(col_mat).fill(0));

         // Initialisation de la première ligne et la première colonne de la matrice
            for (r = 0; r < col_mat; r++) {
                matrice[0][r] = 0;
            }
            for (c = 0; c < lignes_mat; c++) {
                matrice[c][0] = 0;
            }
           
        // Construction de la matrice case par case
            for (i = 1; i < lignes_mat; i++) {
                for (j = 1; j < col_mat; j++) {
                   
                    if (j >= obj[i].poids) {
                    // Le cas ou le sac peut contenir l'objet
        matrice[i][j] = Math.max(matrice[i - 1][j], parseInt(matrice[i - 1][j - obj[i].poids]) + parseInt(obj[i].valeur));
                    }
                    else {
                    // Le cas ou l'objet est exclut
                     matrice[i][j] = matrice[i - 1][j]
                    }

                }
            }
            this.matri = matrice;
            return matrice;
        },

      Recup_resultats(){

          // Le résultat final de la valeur maximal représentant la dernière case de la matrice
             mat = this.Constr_mat();
            lignes_mat = this.lignes;
            col_mat = this.colonnes;
           
           // Recuperation de la valeur maximale
            const resultat_final=mat[lignes_mat - 1][col_mat - 1];

            poids_maximum_variable=this.poids_maximum;
            res=resultat_final;
            obj1 = [{
                id: 0,
                nom: '',
                valeur: 0,
                poids: 0
            }];
            obj1 =this.obj;

           // ceci va contenir la liste d'objets choisis
            this.liste_obj = [] 
            for( i=lignes_mat ; i>0 && res>0 ; i-- ){
                //parcours de la dernière colonne de la matrice ligne par ligne
                if (res != mat[i-1][poids_maximum_variable]){
                    // Dans le cas ou la valeur a été changé, l'objet est choisi
                    this.liste_obj.push(obj1[i-1].nom)
                    res=res-obj1[i-1].valeur;
                    poids_maximum_variable=poids_maximum_variable-obj1[i-1].poids;
                }     
            }

      return resultat_final;
      },

      Afficher_matrice_dyn(){
        // vider le contenu de la matrice affichée
        $("#resultat_final3").html("");

     // Creer une table.
        var table = document.createElement("table");

     // Creer l'entête de la table 
        var tr = table.insertRow(-1);      // création 1ère ligne.
        
     // Création de la première case vide du tableau.
        var th = document.createElement("th"); 
            th.innerHTML = "Objets | Capacité";
            tr.appendChild(th);
     
     // Remplissage des éléments de la première ligne du tableau contenant les capacités
        for (var i = 0; i <= this.poids_maximum; i++) {
           var th2 = document.createElement("th");      
            th2.innerHTML = i;
            tr.appendChild(th2);
        }

     // Ajouter les données de la matrice au tableau à afficher.
        for (var i = 1; i < this.lignes; i++) {
            var th3 = document.createElement("th");      
            var tr2 = table.insertRow(-1); // créer une ligne de l'objet i
            th3.innerHTML ="Objet : "+this.obj[i-1].nom+"<br>"+"Valeur : "+this.obj[i-1].valeur
            +" | Poids : "+this.obj[i-1].poids; 
            tr2.appendChild(th3);     

            for (var j = 0; j < this.colonnes; j++) {
                var tabCell = tr2.insertCell(-1); // créer une case du tableau 
                tabCell.innerHTML = this.matri[i][j]; // rajouter l'element de la matrice
            }
        }
    
    // Rajouter la table crée au div qui convient : #resultat_final3
        var divShowData = document.getElementById('resultat_final3');
        table.classList.add('table');
        divShowData.appendChild(table);
       $('#resultat_final3').show();
      }

    }

})