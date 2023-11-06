# projeto-api-koru
Projeto API com banco de dados, CRUD e Flask, módulo de back-end da Escola Korú.

# endpoints

Os seguintes endpoints estão configurados:

### Líderes

- `/lideres` - GET - Retorna todos os líderes
- `/lideres/<id_lider>` - GET - Retorna um líder pelo ID
- `/lideres` - POST - Cria um novo líder
- `/lideres/<id_lider>` - PUT - Atualiza um líder pelo ID
- `/lideres/<id_lider>` - DELETE - Apaga um líder pelo ID

**Dados para líderes (JSON)**

```
{
	"nome": "nome",
	"departamento": "departamento"
}
```

### Colaboradores

- `/colaboradores` - GET - Retorna todos os colaboradores
- `/colaboradores/<id_colaborador>` - GET - Retorna um colaborador pelo ID
- `/colaboradores` - POST - Cria um novo colaborador
- `/colaboradores/<id_colaborador>` - PUT - Atualiza um colaborador pelo ID
- `/colaboradores/<id_colaborador>` - DELETE - Apaga um colaborador pelo ID

**Dados para colaboradores (JSON)**

```
{
	"nome": "nome",
	"departamento": "departamento"
}
```

### Reuniões

- `/reunioes` - GET - Retorna todos as reuniões
- `/reunioes/<id_reuniao>` - GET - Retorna um colaborador pelo ID
- `/reunioes` - POST - Cria um novo colaborador
- `/reunioes/<id_reuniao>` - PUT - Atualiza um colaborador pelo ID
- `/reunioes/<id_reuniao>` - DELETE - Apaga um colaborador pelo ID

**Dados para reuniões (JSON)**

```
{
	"id_lider": id_lider,
    "id_colaborador": id_colaborador,
    "data_reuniao": "data_reuniao"
}
```

