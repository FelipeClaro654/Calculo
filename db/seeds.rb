# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

TabelaAtualizacao.create!(nome: 'PCA-E')
TabelaAtualizacao.create!(nome: 'TPDJSP')

CbpmIpesp.create!(nome: 'CBPM')
CbpmIpesp.create!(nome: 'IPESP')
CbpmIpesp.create!(nome: 'MISTO')

TipoJuro.create!(nome: 'am')
TipoJuro.create!(nome: 'aa')

CruzIamspe.create!(nome: 'Cruz Azul')
CruzIamspe.create!(nome: 'IAMSPE')

DataCalculo.create!(nome: 'Data')
DataCalculo.create!(nome: 'Citação')
