plugins {
    kotlin("multiplatform") version "2.1.10"
    kotlin("plugin.serialization") version "2.1.10"
}

version = "1.0.0"
group = "org.oar.tmb.viatges"

repositories {
    mavenCentral()
    maven { url = uri("https://jitpack.io") }
}

kotlin {
    js(IR) {
        browser {
            binaries.executable()

            commonWebpackConfig {
                outputFileName = "tmb-viatges.js"
            }
            runTask {
                sourceMaps = false
            }
        }
    }

    sourceSets {
        val jsMain by getting {
            dependencies {
                implementation("com.github.oarsc:kotlin-js-blocks:v1.0.0")
                implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.8.1")
//                implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.9.0")
            }
        }
    }
}
