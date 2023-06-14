using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UrunSatis.Models;
using UrunSatis.View_Model;


namespace UrunSatis.Auth
{
    public class UyeServis
    {
        DBURUNEntities db = new DBURUNEntities();

        public KullaniciModel K_OturumAc(string userAdi, string userSifre)
        {
            KullaniciModel user = db.Kullanici.Where(s => s.userAdi == userAdi && s.userSifre == userSifre).Select(x => new KullaniciModel()

            {
                userId = x.userId,
                userAdi = x.userAdi,
                userAdmin = x.userAdmin,     
                userMail = x.userMail,
                userSifre = x.userSifre,

            }).SingleOrDefault();

            return user;
        }
    }
}