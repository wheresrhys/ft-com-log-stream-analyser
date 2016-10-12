include n.Makefile

deploy-test:
	@export AWS_ACCESS_KEY=$(AWS_ACCESS_KEY_TEST); export AWS_SECRET_KEY=$(AWS_SECRET_KEY_TEST); $(call CONFIG_VARS,production) > $(APEX_PROD_ENV_FILE) && apex deploy --env-file $(APEX_PROD_ENV_FILE) --env test
	@rm $(APEX_PROD_ENV_FILE) && $(DONE)

deploy-prod:
	@$(MAKE) deploy-super

unit-tes%:
	mocha functions/*/test --recursive $(if $(findstring watch,$@),-w,)

test: unit-test
