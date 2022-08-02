//                                                                              MIXIN

// le but --> partager des proprietes / methodes entres plusieurs objets et classes
// les mixins represente un service qu il est possible de greffer aux classes heritieres 
//Object.assign()
//en gros mixin c comme du css , on va pouvoir l appeler ou on veut dans le code sans pour autant devoir faire un copier coller de toute l idee a chaque fois

// exemple mdn docs 

let calculatorMixin = Base => class extends Base {
    calc() { }
  };
  
  let randomizerMixin = Base => class extends Base {
    randomize() { }
  };

  class Toto { }
class Bar extends calculatorMixin(randomizerMixin(Toto)) { }


//exemple plus concret 


let LLivre = class LLivre {
    constructor(titre, auteur, nbrePages) {
        this.titre = titre;
        this.auteur = auteur;
        this.nbrePages = nbrePages;
        
    }

   affichage1(){                                                     //-->cree une fonction anonyme ou methode
     console.log(
    "j ai lu" +
    this.titre + 
    " de " +
        this.auteur);
    }                                        
    
    affichage2(nom){                                                     //-->cree une fonction anonyme ou methode    // je peux cree un argument dans l affichage2()
        console.log(
            "j aime " +
            this.auteur + " " + nom);
    } 
    
    // utilisation methode statique   --> appeler depuis la classe , pas depuis une instance de la classe !  utilité : si on a pas envie que ceci soit dans l instance de la classe ;) 
    
    static livreType() {
        console.log("c est un livre de fantaisie");
    }
    };






let monLLivre = new LLivre( " l' alchimiste" , "paulo coelho", 285)      
console.log(monLLivre);
monLLivre.affichage1();                                 //--> crée l affichage de la methode 1 de monLLivre

LLivre.livreType();       //--> ! je dois interagir depuis la classe dans methode static donc depuis le LLivre V et la ca marche !


// methode extends avec super   
// va extend la classe parents llivre , je vais pouvoir rajouter des proprietes ds avis venant de llivre ou recup proprietes de la classe LLivre


//Sous-classe AVIS de la classe LLivre

class AVIS extends LLivre{
    constructor(titre, avis){
        super(titre);            //> mot clé super recup depuis la classe parent
        this.avis = avis        //> creation de l argument avis
    }
            affichage() {
        //  console.log((`le livre ${this.titre} est noté ${this.avis}`); ou bien return 
                return (`le livre ${this.titre} est noté ${this.avis}`);
            }                   //> methode affichage mnt 
}
//console.log(AVIS);

const avis01 = new AVIS("le voyage merveilleux", "très bien");
avis01.affichage();               //> nickel ca fonctionne  // si on utilise reutrn alors console.log(avis01(affichage)); et ca fonctionnera pareille 
console.log(avis01);



//                  MIXINS
const optionsLivre = {

    emprunterLLivre() {
        console.log("livre qui peut etre emprunté");
    },
    
    acheterLLivre() {
        console.log("livre qui peut etre vendu");
    }
};
console.log(optionsLivre);

Object.assign(LLivre.prototype, optionsLivre)   //=> cree la mixin   (cible --> LLivre, source optionsLivre)   --> on rajoute ttes le props qu 'il y a dans optionsLivre 



let monSuperLivre = new LLivre("l alchimiste" , "paolo coelho" , 111);

monSuperLivre.emprunterLLivre();     //-> livre qui peut etre emprunté , wonderful
