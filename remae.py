import os 
rute = r'C:\Users\Usuario\AppData\Local\ModOrganizer\Skyrim Special Edition\mods\mco combo pureba xd\meshes\actors\character\animations\DynamicAnimationReplacer\_CustomConditions\100133'
count = 1
for filename in os.listdir(rute):
    if os.path.isfile(os.path.join(rute, filename)):
     if filename.startswith("skysa_sword"):
      if filename.endswith('.hkx'):
       os.rename(
        os.path.join(rute, filename),
        os.path.join(rute, "mco_attack" + str(count-1) + ".hkx")
        )
    count += 1
    
    


