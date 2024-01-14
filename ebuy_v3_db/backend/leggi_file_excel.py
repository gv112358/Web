"""
Leggi il file xls

"""

import pandas as pd
import dbclient as db

def StampaDataFrame(dfDataframeToPrint):
    print("StampaDataFrame: richiamata procedura");
    count_row = dfDataframeToPrint.shape[0]
    count_col = dfDataframeToPrint.shape[1]
    #print("Righe e colonne: ",count_row,count_col);
    with pd.option_context('display.max_columns',40):
        print(dfDataframeToPrint.info())
        print(dfDataframeToPrint.describe())
        print(dfDataframeToPrint.head(5))

def SplitDataframe(dfData, sBaseName):
    sBaseName = sBaseName.replace(" ", "").replace("-", "")
    len = dfData.shape[0]
    i = 0
    step = 10000
    while (i < len):
        if (i + step <= len):
            df1 = dfData[i:i + step]
            sFilename = "./csv/" + sBaseName + "" + str(i) + "" + str(i + step - 1) + ".csv"
        else:
            df1 = dfData[i:len]
            sFilename = "./csv/" + sBaseName + "" + str(i) + "" + str(len - 1) + ".csv"

        df1.to_csv(sFilename, index=False)
        i = i + step


print("Inizio programma gestione file excel")
cur = db.connect()
sql_insert = "insert into values "
dati = "(1200,'10489434', '85048', '15CM CHRISTMAS GLASS BALL 20 LIGHTS', 12, TO_DATE('2009/12/03','YYYY/MM/DD'), 6.95, 13085, 'United Kingdom', '07:45');"
sql_insert += dati
db.write_in_db(cur, sql_insert)
db.read_in_db(cur, "select * from ordini;")
db.close(cur)
exit()

#fl.LogInit("./filelog21032022.txt","w")
file_excel = pd.ExcelFile('./online_retail_II.xlsx')
print(type(file_excel))
for sheet in file_excel.sheet_names:
    print(sheet)
#fl.LogEnd()

# prima bisogna trasformare il tipo excel in tipo data frame di pandas
# primo foglio
# df = file_excel.parse((file_excel.sheet_names[0]))
# secondo foglio
df = file_excel.parse((file_excel.sheet_names[1]))


#StampaDataFrame(df)

#SplitDataframe(df, "retail")
SplitDataframe(df, "retail_s1")

