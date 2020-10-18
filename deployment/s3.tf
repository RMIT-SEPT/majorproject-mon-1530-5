terraform {
    backend "s3" {
        bucket = "booking-api-bucket"
        key    = "state.tfstate"
    }
}