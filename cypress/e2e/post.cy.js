

describe('POST /characters', function (){
    
    before(function(){

      cy.back2ThePast()
      cy.setToken()
       
    })  

    it('deve cadastrar um personagem', function(){

      const character = {
        name: 'Miles Moralles',
        alias: 'Homem Aranha',
        team: ['Aranhaverso'],
        active: true
      }  

      cy.postCharacter(character)
        .then(function(response){
          expect(response.status).to.eql(201) 
          cy.log(response.body.character_id)
          expect(response.body.character_id.length).to.eql(24)
        })
     })  
     
    context('quando o personagem ja existe', function(){

        const character = {
        name: 'Pietro Maximoff',
        alias: 'Mercurio',
        team: ['vingadores da costa oeste'],
        active: true
      }

      before(function(){
        cy.postCharacter(character).then(function(response){
           expect(response.status).to.eql(201) 

      })    

    })

      it('não deve cadastrar duplicado', function(){
        cy.postCharacter(character).then(function(response){
           expect(response.status).to.eql(400) 
           expect(response.body.error).to.eql('Duplicate character')
      })
    })
}) 
})


