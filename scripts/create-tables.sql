-- Création des tables pour Djongoo MVP

-- Table des points relais
CREATE TABLE IF NOT EXISTS points_relais (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    ville VARCHAR(255) NOT NULL,
    pays VARCHAR(255) NOT NULL,
    adresse TEXT,
    telephone VARCHAR(50),
    email VARCHAR(255),
    identifiant VARCHAR(50) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL,
    actif BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des colis
CREATE TABLE IF NOT EXISTS colis (
    id SERIAL PRIMARY KEY,
    code_tracking VARCHAR(50) UNIQUE NOT NULL,
    
    -- Informations expéditeur
    expediteur_nom VARCHAR(255) NOT NULL,
    expediteur_telephone VARCHAR(50) NOT NULL,
    
    -- Informations destinataire
    destinataire_nom VARCHAR(255) NOT NULL,
    destinataire_telephone VARCHAR(50) NOT NULL,
    
    -- Informations géographiques
    ville_depart VARCHAR(255) NOT NULL,
    ville_arrivee VARCHAR(255) NOT NULL,
    point_relais_depart_id INTEGER REFERENCES points_relais(id),
    point_relais_arrivee_id INTEGER REFERENCES points_relais(id),
    
    -- Informations du colis
    poids_categorie VARCHAR(50),
    
    -- Statut et dates
    statut VARCHAR(50) DEFAULT 'Enregistré',
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_depot TIMESTAMP,
    date_transit TIMESTAMP,
    date_arrivee TIMESTAMP,
    date_retrait TIMESTAMP,
    
    -- Métadonnées
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table de suivi des étapes
CREATE TABLE IF NOT EXISTS suivi_etapes (
    id SERIAL PRIMARY KEY,
    colis_id INTEGER REFERENCES colis(id) ON DELETE CASCADE,
    etape VARCHAR(100) NOT NULL,
    description TEXT,
    lieu VARCHAR(255),
    date_etape TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour optimiser les recherches
CREATE INDEX IF NOT EXISTS idx_colis_code_tracking ON colis(code_tracking);
CREATE INDEX IF NOT EXISTS idx_colis_statut ON colis(statut);
CREATE INDEX IF NOT EXISTS idx_suivi_colis_id ON suivi_etapes(colis_id);
CREATE INDEX IF NOT EXISTS idx_points_relais_identifiant ON points_relais(identifiant);
