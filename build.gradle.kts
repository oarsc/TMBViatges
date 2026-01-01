plugins {
    kotlin("multiplatform") version "2.1.10"
    kotlin("plugin.serialization") version "2.1.10"
}

version = "1.0.0"
group = "org.oar.tmb.viatges"

repositories {
    mavenCentral()
}

kotlin {
    js {
        browser {
            binaries.executable()
            runTask {
                sourceMaps = false
            }
        }
    }

    sourceSets {
        val serializationVersion = "1.8.1"

        val jsMain by getting {
            dependencies {
                implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:$serializationVersion")
            }
        }
    }
}
