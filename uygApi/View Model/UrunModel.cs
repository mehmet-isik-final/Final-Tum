using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UrunSatis.View_Model
{
    public class UrunModel
    {
        public string urunId { get; set; }
        public string urunAdi { get; set; }
        public string urunBilgi { get; set; }
        public int urunFiyat { get; set; }

        public string urunKat { get; set; }
       
        public Nullable<int> urunDeger { get; set; }
        public Nullable<int> urunStok { get; set; }
        public string urunResim { get; set; }
        public string urunKayit { get; set; }
        public string urunDuzenlenme { get; set; }
        public Nullable<int> urunSecili { get; set; }


    }
}