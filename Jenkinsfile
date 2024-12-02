pipeline {
    agent any

    environment {
        BACKEND_DIST = 'backend/dist'
        FRONTEND_DIST = 'frontend/dist'
        TARGET_DIR = 'deploy'
    }

    stages {
        stage('Build Backend') {
            steps {
                dir('backend') {
                    // Kill tiến trình đang chạy nếu có ds
                    sh 'pkill -f "npm run start" || true'
                    // Cài đặt và khởi chạy server
                    sh 'npm install'
                    sh 'npm run start > backend.log 2>&1 &'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    // Kill tiến trình đang chạy nếu có
                    sh 'pkill -f "npm run serve" || true'
                    // Cài đặt và khởi chạy server
                    sh 'npm install'
                    // sh 'npm run serve > frontend.log 2>&1 &'
                    sh 'npm run build'
                }
            }
        }

        // stage('Collect Artifacts') {
        //     steps {
        //         // Tạo thư mục đích nếu chưa tồn tại
        //         sh "mkdir -p ${TARGET_DIR}"

        //         // Copy dist của backend
        //         sh "cp -r ${BACKEND_DIST} ${TARGET_DIR}/backend"

        //         // Copy dist của frontend
        //         sh "cp -r ${FRONTEND_DIST} ${TARGET_DIR}/frontend"
        //     }
        // }

        // stage('Deploy Artifacts') {
        //     steps {
        //         // Triển khai các tệp dist đã thu thập được
        //         echo "Deploying artifacts from ${TARGET_DIR}..."
        //         sh "ls -l ${TARGET_DIR}" // Kiểm tra nội dung
        //     }
        // }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
