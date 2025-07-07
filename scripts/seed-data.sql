-- Insertion des données de test pour Djongoo MVP

-- Insertion des points relais
INSERT INTO points_relais (nom, ville, pays, adresse, telephone, email, identifiant, mot_de_passe) VALUES
('Point Relais Cocody', 'Abidjan', 'Côte d''Ivoire', 'Rue des Jardins, Cocody', '+225 27 22 44 55 66', 'cocody@djongoo.com', 'PR-COCODY-001', 'password123'),
('Point Relais Plateau', 'Abidjan', 'Côte d''Ivoire', 'Avenue Chardy, Plateau', '+225 27 20 30 40 50', 'plateau@djongoo.com', 'PR-PLATEAU-001', 'password123'),
('Point Relais Yopougon', 'Abidjan', 'Côte d''Ivoire', 'Marché de Yopougon', '+225 27 23 45 67 89', 'yopougon@djongoo.com', 'PR-YOPOUGON-001', 'password123'),

('Point Relais Plateau', 'Dakar', 'Sénégal', 'Avenue Léopold Sédar Senghor', '+221 33 821 23 45', 'plateau.dakar@djongoo.com', 'PR-PLATEAU-DK-001', 'password123'),
('Point Relais Almadies', 'Dakar', 'Sénégal', 'Route des Almadies', '+221 33 820 45 67', 'almadies@djongoo.com', 'PR-ALMADIES-001', 'password123'),
('Point Relais Parcelles', 'Dakar', 'Sénégal', 'Parcelles Assainies', '+221 33 835 67 89', 'parcelles@djongoo.com', 'PR-PARCELLES-001', 'password123'),

('Point Relais Osu', 'Accra', 'Ghana', 'Oxford Street, Osu', '+233 30 276 12 34', 'osu@djongoo.com', 'PR-OSU-001', 'password123'),
('Point Relais Tema', 'Accra', 'Ghana', 'Tema Station', '+233 30 301 45 67', 'tema@djongoo.com', 'PR-TEMA-001', 'password123'),

('Point Relais Centre', 'Lomé', 'Togo', 'Grand Marché, Centre-ville', '+228 22 21 34 56', 'centre.lome@djongoo.com', 'PR-CENTRE-LM-001', 'password123'),
('Point Relais Bè', 'Lomé', 'Togo', 'Quartier Bè', '+228 22 25 67 89', 'be@djongoo.com', 'PR-BE-001', 'password123');

-- Insertion de quelques colis de test
INSERT INTO colis (
    code_tracking, 
    expediteur_nom, 
    expediteur_telephone, 
    destinataire_nom, 
    destinataire_telephone,
    ville_depart, 
    ville_arrivee, 
    point_relais_depart_id, 
    point_relais_arrivee_id,
    poids_categorie,
    statut
) VALUES
('DJG-2849-CI-SN', 'Jean Kouassi', '+225 07 12 34 56 78', 'Marie Diallo', '+221 77 123 45 67', 'Abidjan, Côte d''Ivoire', 'Dakar, Sénégal', 1, 4, '1-5', 'En transit'),
('DJG-1234-GH-TG', 'Kwame Asante', '+233 24 123 45 67', 'Fatou Mensah', '+228 90 123 45 67', 'Accra, Ghana', 'Lomé, Togo', 7, 9, '0-1', 'Arrivé'),
('DJG-5678-CI-GH', 'Aminata Traoré', '+225 05 987 65 43', 'Koffi Yao', '+233 20 456 78 90', 'Abidjan, Côte d''Ivoire', 'Accra, Ghana', 2, 7, '5-10', 'Disponible');

-- Insertion des étapes de suivi pour le premier colis
INSERT INTO suivi_etapes (colis_id, etape, description, lieu, date_etape) VALUES
(1, 'Déposé', 'Colis déposé au point relais', 'Point Relais Cocody - Abidjan', '2024-01-15 09:30:00'),
(1, 'En transit', 'Colis pris en charge par le transporteur', 'Centre de tri - Abidjan', '2024-01-15 14:20:00'),
(1, 'En transit', 'Colis en route vers la destination', 'Transport vers Dakar', '2024-01-16 08:00:00');

-- Insertion des étapes pour le deuxième colis
INSERT INTO suivi_etapes (colis_id, etape, description, lieu, date_etape) VALUES
(2, 'Déposé', 'Colis déposé au point relais', 'Point Relais Osu - Accra', '2024-01-14 11:15:00'),
(2, 'En transit', 'Colis pris en charge par le transporteur', 'Centre de tri - Accra', '2024-01-14 16:30:00'),
(2, 'En transit', 'Colis en route vers la destination', 'Transport vers Lomé', '2024-01-15 07:45:00'),
(2, 'Arrivé', 'Colis arrivé au point relais de destination', 'Point Relais Centre - Lomé', '2024-01-16 14:20:00');

-- Insertion des étapes pour le troisième colis
INSERT INTO suivi_etapes (colis_id, etape, description, lieu, date_etape) VALUES
(3, 'Déposé', 'Colis déposé au point relais', 'Point Relais Plateau - Abidjan', '2024-01-13 10:00:00'),
(3, 'En transit', 'Colis pris en charge par le transporteur', 'Centre de tri - Abidjan', '2024-01-13 15:30:00'),
(3, 'En transit', 'Colis en route vers la destination', 'Transport vers Accra', '2024-01-14 06:00:00'),
(3, 'Arrivé', 'Colis arrivé au point relais de destination', 'Point Relais Osu - Accra', '2024-01-15 12:30:00');
