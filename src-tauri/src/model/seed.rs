use uuid::Uuid;
use serde::{Serialize, Deserialize};
use chrono::{DateTime, Utc};

#[derive(Serialize, Deserialize)]
pub(crate) struct Seed {
    pub id: Uuid,
    pub phrase: String,
    pub seed_type: SeedType,
}

#[derive(Serialize, Deserialize)]
pub(crate) enum SeedType {
    Created { timestamp: DateTime<Utc> },
    Imported { timestamp: DateTime<Utc> },
}