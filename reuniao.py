from lider import Lider
from colaborador import Colaborador

class Reuniao:
    def __init__(self, lider:Lider, colaborador:Colaborador, data:str, id=None):
        self.id = id
        self.lider = lider
        self.colaborador = colaborador
        self.data = data